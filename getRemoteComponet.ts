export const getRemoteEntries = async (name?: string, moduleName?: string): Promise<any[]> => {
    try {    // 从注册中心获取所有可用模块的信息    
        const response = await axios.get(`${baseUrl}/federation/registry.json`)    // 定义过滤条件    
        const filterByName = (distDir: any) => {      // 过滤掉与当前项目前缀相同的模块      
            if (distDir.name.toLowerCase().includes(config.projectPrefix.toLowerCase())) { return false }      // 如果提供了name参数，则按name过滤      
            return !name || distDir.name.includes(name)
        }    // 过滤模块    
        const filteredModules = response.data.filter(filterByName)    // 动态加载匹配的模块    
        const loadedComponents = []    for (const moduleInfo of filteredModules) {
            try {        // 动态构建模块URL        
                const moduleUrl = `${baseUrl}/${moduleInfo.path}/${moduleInfo.name.replace('Module', 'Entry')}.js`        // 使用模块联邦API动态加载模块        
                const remote = await import(/* @vite-ignore */ moduleUrl)
                const moduleFactory = await remote.get('./' + moduleName)
                const module = await moduleFactory()
                loadedComponents.push(module)
            } catch (error) {
                console.error(`加载模块 ${moduleInfo.name} 失败:`, error)
            }
        }
        return loadedComponents
    } catch (error) {
        console.error('获取远程模块失败:', error)
        return []
    }
}
