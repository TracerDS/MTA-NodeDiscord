
addCommandHandler('srun', function(player, cmd, ...)
    loadstring(table.concat{...})()
end)

function openSock()
    return sockOpen('localhost', 22225)
end
function openAndSend(data)
    local s = openSock()
    sockWrite(s, data)
    sockClose(s)
    s = nil
end

addCommandHandler('testit', function(player, cmd, ...)
    local sock = openSock()

    addEventHandler('onSockData',root, function(sock, ...)
        local data = {...}
        iprint(data)
        if data == 'GOODBYE' then 
            sockClose(sock)
            sock = nil
        end
    end)
    local auth = {
        type = 'auth',
        payload = hash('sha512', 'testserver')
    }
    
    local data = {
        type = 'server.start',
        payload = {
            name = getServerName(),
            port = getServerPort(),
            password = getServerPassword(),
            httpPort = getServerHttpPort(),
            maxPlayers = getMaxPlayers(),
            fpsLimit = getFPSLimit(),
            modules = getLoadedModules(),
        }
    }
    iprint(data)
    sockWrite(sock, toJSON(auth):sub(3,-3))
    setTimer(function()
        sockWrite(sock, toJSON(data):sub(3,-3))
    end, 1000, 1)
end)