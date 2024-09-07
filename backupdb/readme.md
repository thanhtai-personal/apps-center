pg_dump -h localhost -p 25433 -U novals novals > noval.dump

netstat -ano | findstr :<PORT>
taskkill /PID <PID> /F