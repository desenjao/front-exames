import { useState, useEffect } from 'react';

const AddExame = ({ token }) => {
    // Estado para cada campo do formulário
    const [nome, setNome] = useState('');
    const [data_nascimento, setDataNascimento] = useState('');
    const [protocolo, setProtocolo] = useState('');
    const [nome_exame, setNomeExame] = useState('');
    const [data_exame, setDataExame] = useState('');
    const [status, setStatus] = useState('Exame agendado'); // Estado para o status

    // Estado para armazenar a lista de exames
    const [exames, setExames] = useState([]);

    // Função para buscar a lista de exames do backend
    const fetchExames = async () => {
        try {
            const response = await fetch('http://localhost:3000/exames', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar exames');
            }

            const data = await response.json();
            setExames(data);
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    // Busca a lista de exames ao carregar o componente
    useEffect(() => {
        fetchExames();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Gera a data de solicitação automaticamente
        const data_solicitacao = new Date().toISOString().split('T')[0];

        // Define a cor com base no status selecionado
        const cores = {
            'Exame agendado': 'vermelho',
            'Exame marcado - paciente veio pegar': 'verde',
            'Exame marcado - esperando paciente pegar': 'amarelo',
        };
        const cor = cores[status];

        // Cria o objeto com os dados do exame
        const novoExame = {
            nome,
            data_nascimento,
            protocolo,
            nome_exame,
            data_solicitacao, // Data de solicitação gerada automaticamente
            data_exame,
            status,
            cor, // Cor associada ao status
        };

        try {
            const response = await fetch('http://localhost:3000/exames', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(novoExame),
            });

            if (!response.ok) {
                throw new Error('Erro ao salvar o exame');
            }

            const newExame = await response.json();
            alert(`Exame adicionado: ${newExame.nome}`);

            // Atualiza a lista de exames após adicionar um novo
            fetchExames();
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao salvar o exame.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Adicionar Exame</h2>

                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Data de Nascimento:</label>
                    <input
                        type="text"
                        placeholder="Data de Nascimento"
                        value={data_nascimento}
                        onChange={(e) => setDataNascimento(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Protocolo:</label>
                    <input
                        type="text"
                        placeholder="Protocolo"
                        value={protocolo}
                        onChange={(e) => setProtocolo(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Nome do Exame:</label>
                    <input
                        type="text"
                        placeholder="Nome do Exame"
                        value={nome_exame}
                        onChange={(e) => setNomeExame(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Data do Exame:</label>
                    <input
                        type="text"
                        value={data_exame}
                        onChange={(e) => setDataExame(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Status:</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    >
                        <option value="Exame agendado">Exame agendado</option>
                        <option value="Exame marcado - paciente veio pegar">Exame marcado - paciente veio pegar</option>
                        <option value="Exame marcado - esperando paciente pegar">Exame marcado - esperando paciente pegar</option>
                    </select>
                </div>

                <button type="submit">Adicionar</button>
            </form>

            {/* Lista de exames */}
            <div>
                <h2>Lista de Exames</h2>
                <ul>
                    {exames.map((exame) => (
                        <li key={exame.id} style={{ backgroundColor: exame.cor, padding: '10px', margin: '5px', borderRadius: '5px' }}>
                            <strong>Nome:</strong> {exame.nome} <br />
                            <strong>Data de Nascimento:</strong> {exame.data_nascimento} <br />
                            <strong>Protocolo:</strong> {exame.protocolo} <br />
                            <strong>Nome do Exame:</strong> {exame.nome_exame} <br />
                            <strong>Data de Solicitação:</strong> {exame.data_solicitacao} <br />
                            <strong>Data do Exame:</strong> {exame.data_exame} <br />
                            <strong>Status:</strong> {exame.status} <br />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AddExame;