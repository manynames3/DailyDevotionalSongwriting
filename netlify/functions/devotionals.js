exports.handler = async function() {
  const SUPABASE_URL = 'https://owgryjlboefkchgibrqm.supabase.co';
  const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93Z3J5amxib2Vma2NoZ2licnFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5MjE3MjAsImV4cCI6MjA5MTQ5NzcyMH0.DO5WtuShQ2YpPF4ZzHZ9y3wcbd4XKHBH390v9hEtMYM';
  const url = SUPABASE_URL + '/rest/v1/devotionals?select=*&order=entry_date.desc';

  try {
    const res = await fetch(url, {
      headers: {
        apikey: SUPABASE_ANON,
        Authorization: 'Bearer ' + SUPABASE_ANON
      }
    });

    if (!res.ok) {
      return {
        statusCode: res.status,
        headers: {'content-type': 'application/json; charset=utf-8'},
        body: JSON.stringify({error: 'upstream-failed', status: res.status})
      };
    }

    const body = await res.text();
    return {
      statusCode: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'no-store'
      },
      body
    };
  } catch (err) {
    return {
      statusCode: 502,
      headers: {'content-type': 'application/json; charset=utf-8'},
      body: JSON.stringify({error: 'proxy-failed', message: String(err)})
    };
  }
};
