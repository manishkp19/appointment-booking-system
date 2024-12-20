export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const response = await fetch(`${process.env.API_URL}/slots/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();

        return new Response(JSON.stringify(data), {
            status: response.status,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ error: 'Failed to fetch data from the external API' }),
            { status: 500 }
        );
    }
}