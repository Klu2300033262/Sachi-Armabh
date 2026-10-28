import unittest

from fastapi.testclient import TestClient

from app.main import app, settings


class HealthTests(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def tearDown(self):
        self.client.close()

    def test_health(self):
        response = self.client.get("/api/health")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json(),
            {"status": "ok", "service": settings.app_name},
        )

    def test_allowed_frontend_origin(self):
        origin = settings.cors_origins[0]
        response = self.client.get("/api/health", headers={"Origin": origin})
        self.assertEqual(response.headers["access-control-allow-origin"], origin)

    def test_unknown_origin_is_not_allowed(self):
        response = self.client.get(
            "/api/health", headers={"Origin": "https://untrusted.example"}
        )
        self.assertNotIn("access-control-allow-origin", response.headers)


if __name__ == "__main__":
    unittest.main()
