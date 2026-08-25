import { test, expect } from '@playwright/test';

test('API: get list of users', async ({ request }) => {
  const res = await request.get('https://reqres.in/api/users?page=2');
  expect(res.ok()).toBeTruthy();

  const body = await res.json();
  expect(body.data.length).toBeGreaterThan(0);
});