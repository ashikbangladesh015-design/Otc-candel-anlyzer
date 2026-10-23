exports.handler = async () => {
  const key = process.env.OTCHARTS_API_KEY;

  if (!key) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "API key সেট করা হয়নি"
      })
    };
  }

  try {
    const url =
      "https://otcharts.com/v1/candles" +
      "?venue=otc&symbol=EURUSD_otc&tf=60&limit=50";

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${key}`
      }
    });

    const data = await response.json();

    return {
      statusCode: response.ok ? 200 : response.status,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store"
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 502,
      body: JSON.stringify({
        error: "API সংযোগ ব্যর্থ"
      })
    };
  }
};
