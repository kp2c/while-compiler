/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
  const data = await request.json()
  const { graph } = data
  console.log(graph)
  try {
    const res = await fetch('https://quickchart.io/graphviz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        graph,
        width: 600
      })
    })
    const svg = await res.text()
    console.log('svg text----\n', svg)
    return {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        svg
      }
    }
  } catch (e) {
    return {
      status: 400,
      body: {
        error: e.message
      }
    }
  }
}