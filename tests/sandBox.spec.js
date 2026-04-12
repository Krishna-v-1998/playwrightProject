const {test, expect} = require('@playwright/test');

const baseUrl = 'https://eventhub.rahulshettyacademy.com';

// - SIX_EVENTS_RESPONSE — a JSON object with data array of 6 event objects and pagination (total: 6)
const SIX_EVENTS_RESPONSE = {
  data: [
    { id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },
    { id: 2, title: 'Rock Night Live',  category: 'Concert',    eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },
    { id: 3, title: 'IPL Finals',       category: 'Sports',     eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },
    { id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false },
    { id: 5, title: 'Lollapalooza India', category: 'Festival', eventDate: '2025-06-20T12:00:00.000Z', venue: 'Mahalaxmi Racecourse', city: 'Mumbai', price: '3000', totalSeats: 5000, availableSeats: 2000, imageUrl: null, isStatic: false },
    { id: 6, title: 'AI & ML Expo',    category: 'Conference',  eventDate: '2025-06-25T10:00:00.000Z', venue: 'Bangalore International Exhibition Centre', city: 'Bangalore', price: '750', totalSeats: 300, availableSeats: 180, imageUrl: null, isStatic: false },
  ],
  pagination: { page: 1, totalPages: 1, total: 6, limit: 12 },
};
// - FOUR_EVENTS_RESPONSE — same shape but only 4 events in data (total: 4)
const FOUR_EVENTS_RESPONSE = {
  data: [
    { id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },
    { id: 2, title: 'Rock Night Live',  category: 'Concert',    eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },
    { id: 3, title: 'IPL Finals',       category: 'Sports',     eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },
    { id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false },
  ],
  pagination: { page: 1, totalPages: 1, total: 4, limit: 12 },
};

test('Banner IS visible when 6 events are returned', async ({page}) => {
    await page.goto(baseUrl);
    await page.locator('#email').fill('v.krishna.99@outlook.com');
    await page.locator('#password').fill('Iamking@000');
    await page.locator('#login-btn').click();

    await page.route('https://api.eventhub.rahulshettyacademy.com/api/events*', async (route) => {
        const response = await page.request.fetch(route.request())
        let body = JSON.stringify(SIX_EVENTS_RESPONSE);
        route.fulfill({
            body,
            response,
        });
    })

    await page.locator('#nav-events').click();
    await page.waitForResponse('https://api.eventhub.rahulshettyacademy.com/api/events*');

    // Verify cards loaded from mock
    const eventCards = page.getByTestId('event-card');
    await expect(eventCards.first().isVisible()).toBeTruthy();
    await expect(eventCards).toHaveCount(6);
    

    // Verify banner is visible
    // - Locate the banner using a case-insensitive text regex: /sandbox holds up to/i
    const banner = page.getByText(/sandbox holds up to/i); // i flag makes it case-insensitive 
    await expect(banner).toBeVisible();
    const bannerText = await page.locator('span strong').first().textContent();
    console.log(bannerText);
    const substring = '9 bookings'
    await expect(bannerText).toBe(substring);
    // await expect(bannerText === substring).toBeTruthy();
    
})

test('Banner is NOT visible when 4 events are returned', async ({page}) => {
    await page.goto(baseUrl);
    await page.locator('#email').fill('v.krishna.99@outlook.com');
    await page.locator('#password').fill('Iamking@000');
    await page.locator('#login-btn').click();
    await page.route('https://api.eventhub.rahulshettyacademy.com/api/events*', async (route) => {
        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(FOUR_EVENTS_RESPONSE);
        route.fulfill({
            response,
            body,
        });
    })

    await page.locator('#nav-events').click();
    await page.waitForResponse('https://api.eventhub.rahulshettyacademy.com/api/events*');

    // Verify cards loaded from mock
    const eventCards = page.getByTestId('event-card');
    await expect(eventCards.first().isVisible()).toBeTruthy();
    await expect(eventCards).toHaveCount(4);
    const banner = page.getByText(/sandbox holds up to/i);
    await expect(banner).not.toBeVisible();

})