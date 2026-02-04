[ok] Cadastro de cliente mudar par aautocomplete regiao base, antigo abaixo
// <FormControl fullWidth error={!!errors?.regioesBaseId}>
// <InputLabel>Região/Base</InputLabel>
// <Controller
// name='regioesBaseId'
// control={control}
// render={({ field }) => (
// <Select
// {...field}
// multiple
// value={field.value || []}
// label='Região Base'
// disabled={props.isSubmitting || props.shouldDisable}
// >
// {regions?.map(({ id, nome }) => (
// <MenuItem key={nome + '-' + id} value={id}>
// {nome}
// </MenuItem>
// ))}
// </Select>
// )}
// />
// </FormControl>

[ok] Cadastro Veiculo Placa colocar autocomplete na Marca do Veiculo, antigo abaixo
// <Controller
// name='fabricanteId'
// control={control}
// render={({ field, fieldState }) => (
// <FormControl
// disabled={shouldDisable}
// fullWidth
// error={!!fieldState.error}
// >
// <InputLabel>Fabricante</InputLabel>
// <Select
// {...field}
// disabled={shouldDisable}
// label='Fabricante'
// value={field.value || ''}
// >
// {fabricantesVeiculo?.map(({ nome, id }) => (
// <MenuItem key={nome} value={id}>
// {nome}
// </MenuItem>
// ))}
// </Select>
// </FormControl>
// )}
// />

[ok] PDF - muda rnome pra secure URL, no primeiro load nao mostra a publicID
[ok] cadastro e cliente, ver pq n esta com loading na tabela que mostra os cadastros
[ok] Remvoer bob: quando upload é novo no PDF
[ok] Se clicar em editar, mudar campos e clicar em editar novamente, ele desabilita a edição e mantém a alteração no campo, deve voltar com o estado inicial no toggle do editar, ver tela de veiculo e outras telas, cadastro de regiao e cliente, ambos no edit-veiculo, edit-client e edit-region
[ok] Colocar tooltip nos icons de deletar imagem e pdf "Remover"

[ ] Durante login, dar disabled no checkbox enquando faz a requisicao
[ ] Ano Exercicio CRLV no pode nunca ser maior que o ano atual, colocar limitar no input do front
[ ] Ano veículo n pode nunca ser maior que o ano atual + 1, colocar limitar no input
[ ] Ano fabricacao n pode nunca ser maior que o ano atual colocar limitar no input
