import { useEffect, useState } from 'react';

const ExamesList = ({ token }) => {
    const [exames, setExames] = useState([]);

    useEffect(() => {
        let isMounted = true; // Flag para verificar se o componente está montado

        const fetchExames = async () => {
            try {
                const response = await fetch('http://localhost:3000/exames', {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                const data = await response.json();

                if (isMounted) {
                    setExames(data); // Atualiza o estado apenas se o componente estiver montado
                }
            } catch (error) {
                console.error('Erro ao buscar exames:', error);
            }
        };

        fetchExames();

        return () => {
            isMounted = false; // Limpa a flag quando o componente é desmontado
        };
    }, [token]);

    // Função para retornar a cor com base no status
    const getCorStatus = (status) => {
        switch (status) {
            case 'Exame agendado':
                return 'red';
            case 'Exame marcado - paciente veio pegar':
                return 'green';
            case 'Exame marcado - esperando paciente pegar':
                return 'yellow';
            default:
                return 'gray'; // Cor padrão para status desconhecido
        }
    };

    return (
        
        <h1></h1>
    );
};

export default ExamesList;