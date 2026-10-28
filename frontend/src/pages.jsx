import { useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Botanical, Icon } from './components/Illustrations'

function TextLink({ to, children, ...props }) {
  return <Link className="text-link" to={to} {...props}>{children}<Icon name="arrow" size={18} /></Link>
}

function SectionHeading({ eyebrow, title, children }) {
  return <div className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{children && <p>{children}</p>}</div>
}

const features = [
  { icon: 'book', color: 'sage', category: 'UNDERSTAND YOUR RECOVERY', title: 'Knowledge that feels like care.',
    body: 'Make room for clear, approachable education about physical recovery, emotional wellbeing, and the changes after birth.',
    action: 'Explore health education',
    detail: 'Recovery is individual. Ask your maternity team about healing, feeding support, rest, and changes in mood. Write down what feels different and when it started. General information cannot tell you whether a symptom is safe.',
  },
  { icon: 'shield', color: 'rose', category: 'PUT SAFETY FIRST', title: 'Know when not to wait.',
    body: 'Understand why warning signs deserve attention, and why reassurance should never come before your safety.',
    action: 'Understand safety assessment',
    detail: 'This website does not assess symptoms or assign a risk score. Heavy bleeding, chest pain, trouble breathing, seizures, or thoughts of harm need immediate help. Other new or worsening symptoms need professional advice. See our Safety page for more.',
  },
  { icon: 'compass', color: 'lavender', category: 'MAKE THE NEXT STEP EASIER', title: 'A clearer path to human care.',
    body: 'Think through whom to contact, how to get there, and what practical support could help you reach care.',
    action: 'Explore care access planning',
    detail: 'Keep your maternity unit and healthcare professional’s contact details somewhere easy to find. Consider transport, cost, childcare, language needs, and a trusted person who can accompany you. We do not locate, verify, or book services.',
  },
  { icon: 'chat', color: 'sand', category: 'FEEL MORE PREPARED', title: 'Your questions deserve space.',
    body: 'Bring your concerns, your observations, and your questions into the conversation with your healthcare professional.',
    action: 'Prepare for a consultation',
    detail: 'On paper or in your own notes, list your main concern, when it began, changes over time, medicines, and questions. Ask: What should I watch for? When should I seek help? What is the follow-up plan? Do not wait for an appointment if you need urgent help.',
  },
]

function ModePreview({ mode, onClose }) {
  const heading = useRef(null)
  const advanced = mode === 'advanced'
  useEffect(() => { heading.current?.focus() }, [mode])

  return (
    <section className="mode-preview" aria-labelledby="preview-title">
      <div className="preview-top"><span className="eyebrow">A GUIDED PREVIEW · NO PERSONAL DATA NEEDED</span>
        <button className="icon-button" onClick={onClose} aria-label="Close mode preview"><Icon name="close" /></button></div>
      <h3 ref={heading} tabIndex={-1} id="preview-title">{advanced ? 'A little more room to plan.' : 'One gentle step at a time.'}</h3>
      <p>{advanced ? 'Use these prompts in your own notes to prepare for a conversation with a professional.' : 'A simple starting point when you want less to read and a little more clarity.'}</p>
      <ol className="preview-steps">
        <li><strong>Start with safety.</strong> If you feel seriously unwell, seek urgent help. <Link to="/safety">Read the warning signs.</Link></li>
        <li><strong>Name what you need.</strong> Is it recovery information, emotional support, or help reaching a healthcare professional?</li>
        <li><strong>Choose a human next step.</strong> Contact your maternity team or a qualified professional. Ask someone you trust to help if needed.</li>
        {advanced && <><li><strong>Plan the practical details.</strong> Consider transport, childcare, cost, accessibility, and who could go with you.</li>
          <li><strong>Prepare your conversation.</strong> Note when the concern began, how it has changed, medicines you take, and your top questions.</li>
          <li><strong>Agree on follow-up.</strong> Ask what happens next, whom to contact, and which changes mean you should seek help sooner.</li></>}
      </ol>
      <div className="preview-note"><Icon name="shield" size={20} /><p>This is static educational guidance, not an AI assessment. There is no symptom analysis, diagnosis, or clinician review.</p></div>
    </section>
  )
}

export function Home() {
  const [params, setParams] = useSearchParams()
  const mode = ['minimal', 'advanced'].includes(params.get('mode')) ? params.get('mode') : null
  const modeButtons = useRef({})
  const chooseMode = (next) => {
    setParams({ mode: next }, { preventScrollReset: true })
  }

  return (
    <>
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy">
          <span className="eyebrow"><span className="little-line" /> A SOFTER START TO YOUR NEXT CHAPTER</span>
          <h1 id="hero-title">Your postpartum<br className="desktop-break" /> journey deserves<br className="desktop-break" /> <em>care, too.</em></h1>
          <p>So much changes after birth. You don’t have to make sense of it all alone. Find a little clarity, feel more prepared, and take your next step with confidence.</p>
          <div className="hero-actions"><a className="button" href="#choose-path">Find your next step <Icon name="arrow" size={19} /></a>
            <a className="quiet-link" href="#how-it-works">How it works <span aria-hidden="true">↗</span></a></div>
          <div className="hero-trust"><span><Icon name="heart" size={16} /> Mother-centered</span><span><Icon name="lock" size={15} /> Privacy-minded</span><span><Icon name="leaf" size={16} /> At your pace</span></div>
        </div>
        <div className="hero-visual">
          <div className="image-arch"><img src="/images/mother-and-baby.jpg" width="1600" height="1067" alt="A mother tenderly kissing her baby in a softly lit room" fetchPriority="high" /></div>
          <span className="image-overline">FOR THE MOTHER. FOR THE PERSON.</span>
          <Botanical className="hero-botanical" />
          <div className="image-note"><span className="note-icon"><Icon name="heart" size={24} /></span><div>You’re finding your way.<small>And you deserve support along it.</small></div></div>
          <span className="image-caption">A new beginning, with you at the center.</span>
        </div>
      </section>

      <div className="care-ribbon"><div className="container"><Icon name="shield" size={20} /><p>A little guidance. Never a replacement for professional care.</p><Link to="/safety">Our safety promise <Icon name="arrow" size={16} /></Link></div></div>

      <section className="intro-section container">
        <span className="eyebrow">WELCOME TO SACHIARAMBH</span>
        <h2>Because a new beginning<br />is yours, <em>too.</em></h2>
        <div><p>The fourth trimester can be full of love, questions, and unfamiliar feelings. SachiArambh is a thoughtful starting point for understanding postpartum wellbeing and finding your way toward the right care.</p>
          <TextLink to="/about">Get to know our purpose</TextLink></div>
      </section>

      <section className="path-section" id="choose-path" tabIndex={-1}>
        <div className="container">
          <SectionHeading eyebrow="YOUR JOURNEY, YOUR PACE" title={<>A little support.<br />The way <em>you</em> need it.</>}>Some days, simple is enough. Other days, you may want to explore a little more.</SectionHeading>
          <div className="mode-grid">
            {[{ id: 'minimal', name: 'Minimal Mode', icon: 'leaf', label: 'LESS TO TAKE IN. ROOM TO BREATHE.', title: 'Let’s keep it simple.', description: 'A gentle, focused starting point when you want clarity without the overwhelm.', points: ['A few clear steps', 'Simple, everyday language', 'Space to pause and go at your pace'] },
              { id: 'advanced', name: 'Advanced Mode', icon: 'spark', label: 'MORE CONTEXT. A CLEARER PLAN.', title: 'Let’s look a little deeper.', description: 'A more detailed guide to help you organize your thoughts and prepare for care.', points: ['More room for reflection', 'Practical care-planning prompts', 'Questions to bring to a professional'] }].map(item => (
              <article className={`mode-card ${item.id}`} key={item.id}>
                <div className="mode-top"><span className="icon-tile"><Icon name={item.icon} size={27} /></span><span className="mode-label">{item.name}</span></div>
                <span className="eyebrow">{item.label}</span><h3>{item.title}</h3><p>{item.description}</p>
                <ul>{item.points.map(point => <li key={point}><Icon name="check" size={17} />{point}</li>)}</ul>
                <button className={`button ${item.id === 'advanced' ? 'button-outline' : ''}`}
                  ref={node => { modeButtons.current[item.id] = node }}
                  aria-expanded={mode === item.id} aria-controls="mode-preview" onClick={() => chooseMode(item.id)}>
                  Explore {item.name}<Icon name="arrow" size={18} />
                </button>
              </article>
            ))}
          </div>
          <p className="mode-disclaimer"><Icon name="lock" size={14} /> No sign-up. No health details to enter. Educational previews, not live AI assessments.</p>
          <div id="mode-preview" hidden={!mode}>{mode && <ModePreview mode={mode} onClose={() => {
            setParams({}, { preventScrollReset: true })
            modeButtons.current[mode]?.focus()
          }} />}</div>
        </div>
      </section>

      <section className="how-section container" id="how-it-works" tabIndex={-1}>
        <SectionHeading eyebrow="HOW IT WORKS" title={<>From a question to<br />a more confident <em>next step.</em></>} />
        <div className="steps-grid">
          {[['01', 'Start where you are.', 'Choose the pace that feels right. A short guide or a little more context — there’s no wrong place to begin.'],
            ['02', 'Make space for clarity.', 'Explore plain-language education, safety principles, and practical prompts for the things on your mind.'],
            ['03', 'Take it into real life.', 'Use what you’ve learned to prepare questions and connect with qualified, human support.']].map(([number, title, text]) => (
            <article key={number} className="step-card"><span className="step-number">{number}</span><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="feature-heading"><SectionHeading eyebrow="THOUGHTFUL SUPPORT, NOT MORE NOISE" title={<>Care for the questions<br />you carry.</>} /><p>For your body, your peace of mind,<br />and the practical steps in between.</p></div>
          <div className="feature-grid">{features.map(feature => (
            <article className="feature-card" key={feature.title}>
              <span className={`icon-tile ${feature.color}`}><Icon name={feature.icon} size={27} /></span>
              <span className="eyebrow">{feature.category}</span><h3>{feature.title}</h3><p>{feature.body}</p>
              <details><summary>{feature.action}<Icon name="plus" size={17} /></summary><div className="detail-content">{feature.detail}{feature.icon === 'shield' && <Link to="/safety">Read our safety guidance <span aria-hidden="true">→</span></Link>}</div></details>
            </article>
          ))}</div>
        </div>
      </section>

      <section className="reassurance-section container">
        <div className="reassurance-photo"><img src="/images/newborn-closeup.jpg" width="1200" height="800" loading="lazy" alt="A peaceful newborn sleeping, gently wrapped in a soft white blanket" /><span className="photo-caption">Small moments. A whole new world.</span></div>
        <div className="reassurance-copy"><span className="eyebrow">A GENTLER KIND OF GUIDANCE</span><h2>You don’t need<br />all the answers.<br /><em>Just a place to begin.</em></h2><p>There is no perfect way to navigate life after birth. Your questions are valid. Asking for help is not a failure. And caring for yourself is part of caring for your family.</p><TextLink to="/safety">Care that knows its limits</TextLink></div>
      </section>

      <section className="privacy-section container">
        <Botanical /><div className="privacy-symbol"><Icon name="lock" size={34} /></div>
        <div><span className="eyebrow">PERSONAL WELLBEING. PERSONAL BOUNDARIES.</span><h2>Your story belongs to you.</h2><p>Explore without an account or sharing your health details. This version has no AI connection, tracking analytics, or health-data storage. Clarity should start with knowing what happens to your information.</p><TextLink to="/privacy">Our approach to your privacy</TextLink></div>
      </section>

      <div className="closing-note container"><Icon name="leaf" size={25} /><p>From confusion to the right next step.</p><span>ONE GENTLE STEP AT A TIME.</span></div>
    </>
  )
}

function PageIntro({ label, title, children }) {
  return <section className="page-intro container"><span className="eyebrow">{label}</span><h1>{title}</h1><p>{children}</p><Botanical /></section>
}

export function About() {
  return (
    <>
      <PageIntro label="OUR PURPOSE" title={<>A new beginning.<br /><em>With the mother in mind.</em></>}>From confusion to the right next step. A thoughtful vision for making postpartum information feel less overwhelming and human care feel more within reach.</PageIntro>
      <div className="editorial-layout container">
        <aside className="editorial-aside"><Icon name="leaf" size={36} /><p>Not more information.<br /><em>More understanding.</em></p><span>A MATERNAL-WELLBEING LEARNING PROJECT</span></aside>
        <div className="prose">
          <section><h2>Why SachiArambh exists</h2><p>After birth, attention often shifts to the baby. Yet the person who gave birth is recovering, adjusting, and making sense of a profoundly new chapter. SachiArambh makes room for that person, too.</p><p>This independent learning project explores a more compassionate approach to health navigation: clear education, visible safety boundaries, practical planning, and better-prepared conversations with qualified professionals. It is not a healthcare provider or a clinically validated medical product.</p></section>
          <section><h2>Our Generative AI objective</h2><p>Our research objective is to explore whether Generative AI can turn complicated information into approachable explanations and help organize non-diagnostic next steps. The intended focus is navigation and preparation, not deciding what condition someone has or prescribing treatment.</p><p><strong>No AI service is connected in this version.</strong> The mode previews are authored, static content. There are no automated assessments, personalized recommendations, or clinician-reviewed results.</p></section>
          <section><h2>Prompt engineering, with boundaries</h2><p>The planned prompt-engineering work is about designing and testing instructions that prioritize:</p><ul><li>Plain, compassionate language without blame or false reassurance.</li><li>Clear separation of general education from diagnosis and treatment.</li><li>Visible uncertainty, rather than inventing facts or pretending to know.</li><li>Urgent-care escalation that is never delayed by a chat or questionnaire.</li><li>Minimal collection of personal information and transparent consent.</li></ul><p>Future evaluation would need realistic test cases, unsafe-output testing, source verification, privacy review, and review by qualified maternal-health professionals. These are objectives, not completed validations.</p></section>
          <section className="soft-callout"><Icon name="heart" size={26} /><h3>Technology can support a conversation.<br />It should never replace care.</h3><p>Any future AI feature would need separate safety work, a named provider, and an updated privacy notice before health information could be submitted.</p></section>
          <TextLink to="/safety">Understand our safety boundaries</TextLink>
        </div>
      </div>
    </>
  )
}

export function Privacy() {
  return (
    <>
      <PageIntro label="PRIVACY, IN PLAIN LANGUAGE" title={<>Your information.<br /><em>Your right to understand.</em></>}>You deserve to know what happens behind the screen. Here is what this version does — and does not do — with your information.</PageIntro>
      <div className="container policy-layout">
        <div className="policy-summary"><Icon name="lock" size={26} /><div><strong>No account. No health forms. No AI connection.</strong><p>You can read every page and explore both modes without entering personal or health information.</p></div></div>
        <div className="prose">
          <section><h2>What you share in the interface</h2><p>This version does not ask for your name, email, symptoms, medical history, location, or other health information. There are no uploads, free-text prompts, accounts, or contact forms.</p><p>Choosing Minimal or Advanced Mode changes a query parameter in the page URL. That choice may appear in your browser history and in web-server access logs if that URL is requested. It is not a medical assessment or a saved health profile.</p></section>
          <section><h2>What is processed and stored</h2><p>The browser renders the pages and temporarily holds interface state, such as an open menu or expanded guidance. The application does not create health records or use cookies, local storage, session storage, advertising trackers, or analytics tools.</p><p>Your browser may cache site files and retain browsing history. Hosting, proxy, and development servers can process technical information such as your IP address, requested URLs, timestamps, and browser request headers. Access logging and retention depend on the environment running the site; this project does not define or promise a log-retention period.</p><p>The separate FastAPI backend currently exposes only a health-status endpoint. That endpoint returns service status and accepts no health submission. The website does not send health information to it.</p></section>
          <section><h2>What goes to AI services</h2><p><strong>Nothing is sent to an AI service.</strong> No model, AI provider SDK, or AI API is integrated. Both modes show static educational guidance; they do not analyze your circumstances.</p><p>If AI is added later, this notice must first explain the provider, the exact information transmitted, the purpose, retention and training policies, and meaningful choices before any sensitive information is submitted. The present notice does not authorize a future AI integration.</p></section>
          <section><h2>Images, fonts, and external links</h2><p>Photography and fonts are served with the website, not loaded from a third-party image or font service when you visit. Following an external source or image-credit link takes you to another organization’s website, where its own privacy practices apply.</p></section>
          <section><h2>Your choices and practical limits</h2><p>You may browse without providing personal details. You can clear browser history and cached files through your browser settings. This does not erase server-side logs. No user-data export or deletion portal exists because this version has no accounts or application database.</p><p>This is a development project, not a production health service. A real deployment would need an identified operator, a privacy contact, retention rules, security review, and appropriate legal safeguards. Do not send sensitive information through source-code issues or other public channels.</p></section>
          <section className="image-credits"><h2>Photography & licenses</h2><p>Images illustrate caregiving; the people pictured are not presented as patients, users, or endorsers.</p><ul><li>“Mother Kissing Her Cute Baby” by Polina Tankilevitch, <a href="https://www.pexels.com/photo/mother-kissing-her-cute-baby-3875225/" target="_blank" rel="noreferrer">Pexels photo 3875225 (opens in a new tab)</a>.</li><li>“Baby Sleeping While Covered White Coat” by Daisy Laparra, <a href="https://www.pexels.com/photo/baby-sleeping-while-covered-white-coat-826734/" target="_blank" rel="noreferrer">Pexels photo 826734 (opens in a new tab)</a>.</li></ul><p>Used under the <a href="https://www.pexels.com/license/" target="_blank" rel="noreferrer">Pexels License (opens in a new tab)</a>. DM Sans and Cormorant Garamond are distributed under the SIL Open Font License through Fontsource. Botanical illustrations are original to this project.</p></section>
        </div>
      </div>
    </>
  )
}

export function Safety() {
  return (
    <>
      <PageIntro label="YOUR SAFETY COMES FIRST" title={<>Guidance has limits.<br /><em>Your care should not.</em></>}>SachiArambh is a place to learn and prepare. It is not a substitute for assessment, diagnosis, treatment, or an emergency service.</PageIntro>
      <div className="container policy-layout">
        <section className="urgent-callout" aria-labelledby="urgent-title"><Icon name="shield" size={30} /><div><span className="eyebrow">DON’T WAIT FOR AN ONLINE ANSWER</span><h2 id="urgent-title">If you may be in immediate danger, get help now.</h2><p>Call your local emergency number or go to the nearest emergency department. If you feel unsafe or have thoughts of harming yourself or your baby, seek immediate help and ask a trusted person to stay with you. If possible, tell responders that you are pregnant or have recently given birth.</p></div></section>
        <div className="prose">
          <section><h2>Education is not diagnosis</h2><p>The website offers general educational content and preparation prompts. It cannot examine you, interpret your medical history, rule out complications, or tell you whether a symptom is normal. No clinician monitors this website, and no symptoms are assessed by either mode.</p><p>Do not start, stop, or change medicines or treatment based on this site. Discuss individual concerns with a qualified healthcare professional who can assess your situation.</p></section>
          <section><h2>Warning signs deserve prompt attention</h2><p>Serious complications can happen after birth, including during the year following delivery. Seek immediate medical care for warning signs such as:</p><ul className="warning-list"><li>Chest pain, trouble breathing, fainting, or seizures.</li><li>Heavy bleeding, such as soaking a pad in an hour, or passing clots larger than an egg.</li><li>A severe or persistent headache, changes in vision, or severe abdominal pain.</li><li>A temperature of 38°C / 100.4°F or higher.</li><li>Severe swelling, redness, or pain in one leg or arm.</li><li>Thoughts of harming yourself or your baby, severe confusion, or seeing or hearing things others do not.</li></ul><p><strong>This list is not exhaustive and is not a triage tool.</strong> Call emergency services for severe or life-threatening symptoms. Do not wait for a routine appointment or online guidance. If something feels wrong, even if it is not listed here, contact your maternity unit or healthcare professional promptly.</p></section>
          <section><h2>Uncertainty is a reason to ask, not to dismiss</h2><p>Recovery varies, and the same symptom can have different causes. General information may be incomplete or not apply to you. The absence of a warning sign on this page is not reassurance that you are safe. If symptoms are new, worsening, persistent, or concerning, seek professional advice.</p><p>Future Generative AI could also produce incorrect, biased, outdated, or confidently worded answers. No AI is active here, and adding a model would not remove the need for qualified human assessment.</p></section>
          <section><h2>Plan for support, without delaying care</h2><p>Keep your maternity unit’s number and local emergency number accessible. If you need help reaching care, ask a trusted person about transport, childcare, or accompaniment. This website does not arrange appointments, verify nearby providers, or contact emergency services on your behalf.</p></section>
          <section className="sources"><h2>Read trusted guidance</h2><p>These links provide additional education, not personalized advice. Local healthcare instructions may differ.</p><a href="https://www.cdc.gov/hearher/maternal-warning-signs/index.html" target="_blank" rel="noreferrer">CDC — Urgent maternal warning signs <span>(opens in a new tab)</span><Icon name="arrow" size={18} /></a><a href="https://www.who.int/health-topics/maternal-health" target="_blank" rel="noreferrer">WHO — Maternal health <span>(opens in a new tab)</span><Icon name="arrow" size={18} /></a></section>
          <TextLink to="/#choose-path">Return to a gentle starting point</TextLink>
        </div>
      </div>
    </>
  )
}
