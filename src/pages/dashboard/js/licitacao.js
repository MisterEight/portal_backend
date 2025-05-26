document.addEventListener('DOMContentLoaded', function() {
    
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });


    const statusFilter = document.getElementById('statusFilter');
    const dateStartFilter = document.getElementById('dateStartFilter');
    const dateEndFilter = document.getElementById('dateEndFilter');
    const searchFilter = document.getElementById('searchFilter');
    const licitacoesTable = document.getElementById('licitacoesTable');

    
    function aplicarFiltros() {
        const status = statusFilter.value;
        const dataInicio = dateStartFilter.value;
        const dataFim = dateEndFilter.value;
        const termoBusca = searchFilter.value.toLowerCase();

        const linhas = licitacoesTable.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

        for (let linha of linhas) {
            const titulo = linha.cells[1].textContent.toLowerCase();
            const statusLinha = linha.cells[4].textContent.trim();
            const dataInicioLinha = linha.cells[2].textContent;
            const dataFimLinha = linha.cells[3].textContent;

            const statusCorreto = !status || statusLinha === status;
            const dataCorreta = (!dataInicio || dataInicioLinha >= dataInicio) && (!dataFim || dataFimLinha <= dataFim);
            const buscaCorreta = !termoBusca || titulo.includes(termoBusca);

            linha.style.display = statusCorreto && dataCorreta && buscaCorreta ? '' : 'none';
        }
    }

    
    statusFilter.addEventListener('change', aplicarFiltros);
    dateStartFilter.addEventListener('change', aplicarFiltros);
    dateEndFilter.addEventListener('change', aplicarFiltros);
    searchFilter.addEventListener('input', aplicarFiltros);

    
    document.querySelectorAll('.btn-view').forEach(botao => {
        botao.addEventListener('click', function() {
            const idLicitacao = this.closest('tr').querySelector('td').textContent;
            visualizarLicitacao(idLicitacao);
        });
    });

    document.querySelectorAll('.btn-edit').forEach(botao => {
        botao.addEventListener('click', function() {
            const idLicitacao = this.closest('tr').querySelector('td').textContent;
            editarLicitacao(idLicitacao);
        });
    });

    document.querySelectorAll('.btn-delete').forEach(botao => {
        botao.addEventListener('click', function() {
            const idLicitacao = this.closest('tr').querySelector('td').textContent;
            excluirLicitacao(idLicitacao);
        });
    });
});


function visualizarLicitacao(id) {
    
    console.log('Visualizando licitação:', id);
    
}


function editarLicitacao(id) {
    
    console.log('Editando licitação:', id);
    
}


function excluirLicitacao(id) {
    if (confirm('Tem certeza que deseja excluir esta licitação? Esta ação não poderá ser desfeita.')) {
        
        console.log('Excluindo licitação:', id);
        
    }
}


function criarNovaLicitacao() {
   
    console.log('Criando nova licitação');
   
} 