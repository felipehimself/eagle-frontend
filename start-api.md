[+] Iniciar SQL Server Docker: docker start sql-server
[+] Inciar Back: cd projects/EagleTransportes/EagleAPI && dotnet run --project ./EagleServices/EagleAPI.Services.csproj

[+] Caso necessário add migration
dotnet ef migrations add Nova2 \
 --project ./EagleApi.Infra.Data/EagleAPI.Infra.Data.csproj \
 --startup-project ./EagleServices/EagleAPI.Services.csproj

[+] Caso necessário update database
dotnet ef database update \
 --project ./EagleApi.Infra.Data/EagleAPI.Infra.Data.csproj \
 --startup-project ./EagleServices/EagleAPI.Services.csproj

[+] Entrar no container
docker exec -it sql-server bash

[+] Interagir com o container
/opt/mssql-tools18/bin/sqlcmd -S localhost -U SA -P "Your_password123" -C

[+] Deletar arquivos temporarios
rm -f /var/opt/mssql/data/EagleDB.mdf
rm -f /var/opt/mssql/data/EagleDB_log.ldf

[+] Ver databases
SELECT name FROM sys.databases

[+] Drop

DROP DATABASE EagleDB;
GO

////

"DefaultConnection": "Server=localhost,1433;Database=EagleDB;User Id=sa;Password=Your_password123;TrustServerCertificate=True;"
