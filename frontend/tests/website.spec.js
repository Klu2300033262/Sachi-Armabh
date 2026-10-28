import { test, expect } from '@playwright/test'

test('all four pages render directly without runtime errors or external assets', async ({ page }) => {
  const errors = []
  const externalRequests = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('request', request => {
    if (/^https?:/.test(request.url()) && !request.url().startsWith('http://127.0.0.1:5173/')) {
      externalRequests.push(request.url())
    }
  })
  for (const route of ['/', '/about', '/privacy', '/safety']) {
    await page.goto(route)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page).toHaveTitle(/SachiArambh/)
    await expect(page.locator(`.main-nav a[href="${route}"]`)).toHaveAttribute('aria-current', 'page')
  }
  expect(errors).toEqual([])
  expect(externalRequests).toEqual([])
})

test('modes, disclosure cards, deep links, and focus restoration work', async ({ page }) => {
  await page.goto('/')
  for (const [mode, length] of [['Minimal', 3], ['Advanced', 6]]) {
    const trigger = page.getByRole('button', { name: `Explore ${mode} Mode`, exact: true })
    await trigger.click()
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')
    await expect(page.locator('#preview-title')).toBeFocused()
    await expect(page.locator('.preview-steps li')).toHaveCount(length)
    await page.getByRole('button', { name: 'Close mode preview' }).click()
    await expect(trigger).toBeFocused()
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  }
  for (const card of await page.locator('.feature-card').all()) {
    await card.locator('summary').click()
    await expect(card.locator('details')).toHaveAttribute('open', '')
    await expect(card.locator('.detail-content')).toBeVisible()
  }
  await page.goto('/?mode=advanced')
  await expect(page.locator('.preview-steps li')).toHaveCount(6)
  await page.goto('/?mode=invalid')
  await expect(page.locator('#mode-preview')).toBeHidden()
  await page.goto('/about')
  await page.locator('.main-nav').getByRole('link', { name: 'Find your next step' }).click()
  await expect(page).toHaveURL('/#choose-path')
  await expect(page.locator('#choose-path')).toBeFocused()
  await page.goBack()
  await expect(page).toHaveURL('/about')
})

test('mobile menu is keyboard accessible and closes on navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const toggle = page.getByRole('button', { name: 'Open navigation' })
  await toggle.click()
  await page.keyboard.press('Escape')
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  await expect(toggle).toBeFocused()
  await toggle.click()
  await expect(page.getByRole('button', { name: 'Close navigation' })).toHaveAttribute('aria-expanded', 'true')
  await page.locator('.main-nav').getByRole('link', { name: 'About', exact: true }).click()
  await expect(page).toHaveURL('/about')
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  await expect(page.locator('#main-content')).toBeFocused()
  await toggle.click()
  await page.locator('.main-nav').getByRole('link', { name: 'Home', exact: true }).focus()
  await page.keyboard.press('Escape')
  await expect(toggle).toBeFocused()
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  await page.goto('/')
  await page.getByRole('link', { name: 'Skip to content' }).waitFor({ state: 'attached' })
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('#main-content')).toBeFocused()
})

test('all routes fit mobile, tablet, and desktop widths; photographs load', async ({ page }) => {
  for (const width of [320, 390, 600, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    for (const route of ['/', '/about', '/privacy', '/safety']) {
      await page.goto(route)
      await page.evaluate(() => document.fonts.ready)
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
      expect(overflow, `Horizontal overflow on ${route} at ${width}px`).toBe(false)
    }
  }
  await page.goto('/')
  for (const image of await page.locator('main img').all()) {
    await image.scrollIntoViewIfNeeded()
    await expect(image).toHaveAttribute('alt', /.+/)
    await expect.poll(() => image.evaluate(element => element.complete && element.naturalWidth > 0)).toBe(true)
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await page.screenshot({ path: 'test-results/home-desktop.png', fullPage: true })
})
