from django.test import TestCase


class TestSearch(TestCase):
    def test_search(self):
        response = self.client.get("/search/")
        self.assertEqual(response.status_code, 200)
        self.assertNotContains(response, "No results found")

    def test_search_none_found(self):
        response = self.client.get("/search/?query=test")
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "No results found")
