export async function POST(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const extUrl = `${process.env.API_URL}/slots/${id}/cancel-booking`;
        const response = await fetch(extUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
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
