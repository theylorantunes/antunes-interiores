
export default async function handler(req, res) {

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido' });
    }


    const AZURE_ENDPOINT = process.env.AZURE_ENDPOINT;
    const AZURE_API_KEY = process.env.AZURE_API_KEY;

    if (!AZURE_ENDPOINT || !AZURE_API_KEY) {
        return res.status(500).json({ error: 'Erro de configuração no servidor (Chaves ausentes)' });
    }

    try {
        const { messages } = req.body;


        const response = await fetch(AZURE_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': AZURE_API_KEY 
            },
            body: JSON.stringify({
                messages: messages,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Azure Error: ${errorText}`);
        }

        const data = await response.json();
        
        return res.status(200).json(data);

    } catch (error) {
        console.error("Erro interno:", error);
        return res.status(500).json({ error: 'Erro ao processar solicitação.' });
    }
}