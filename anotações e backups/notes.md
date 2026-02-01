[ ] Formatar placa, ano, quantidade, cpe, cpf etc na tela de veiculos e placas...
[ ] Cotinuar ajustes de validação em driver e em rotas agora usando hook form
[ ] Ver anotações da reunião e ajsutar os locais
[ ] Ver locais que terao chamadas de api do sistema e criar funcoes que retornam mock
[ ] onde já tenho chamada de API mocada, buscar lugares para implementar a chamada mocada
[ ] Ver os campos required para não colocar o \*
[ ] Ajustar inputs que no front é Sim Não e back vai ser boolean para tipo "Sim" | "Não", facilitará o parse para o payload
[ ] usar queryClient.invalidateQueries sempre que salvar a edição, pois se nõa, a pessoa entrará na página pós edição e verá o mesmo dado
[ ] Procurar todos as palavras APIS TODO: FIXME:

[ ] Tentar normalizar mais o tema do mui, cores e typography
[ ] Mudar select do regiao base pra auto complete
[ ] Nas rotas, ajustar o input pesquisar pra ter icone nao clicável mas no add ter icone clicável
[ok] Na feature rotas, criar drawer na direita que abre para a esquerda, pra ter um mini form de busca e preencher grid, no grid terá opção de ver, no ver levará para a tela de editar
[ok] Usar notistack + mui e criar hook
[ok] Tirar ripple do submenu do menu
[ok] Criar formulario de motorista/ajudante + tabela
[ok] Criar form de clientes + tabela
[ok] Criar formulario de cadastro de veiculos + tabela
[ok] Ajustar Drawer para que tenha botão logout no final...
[ok] Ajustar layout do auth para redirecionar para pag inicial caso esteja logado, atualmente se for em sign ou signup ele deixa

==============================
// Em oficina ou eventos, terá opçao de cadastrar sinistro, nela tem que ter upload:

            {/* <Grid size={{ xs: 12, md: 4 }}>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                disabled={shouldDisable}
                fullWidth
                sx={{ mt: 2 }}
              >
                Upload GR
                <VisuallyHiddenInput
                  type="file"
                  onChange={(event) => console.log(event.target.files)}
                />
              </Button>
            </Grid> */}
