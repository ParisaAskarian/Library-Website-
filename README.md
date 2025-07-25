def CaculateGNode(self,node,environment):
        path_cost ={
            'steps' : 0 ,
            'energy_usage' : 0
        }
        i = 1
        for i in range(1,node[1]):
            state = (i,0)
            if environment[state] == 'empty':
                path_cost['steps'] += 1
                path_cost['energy_usage'] += 1
            elif environment[state] == 'wall':
                path_cost['steps'] += 3
                path_cost['energy_usage'] += 3
            elif environment[state] == 'hazard':
                path_cost['steps'] += 1
                path_cost['energy_usage'] += 3
            elif environment[state] == 'resource':
                path_cost['steps'] += 1
                path_cost['energy_usage'] += 2           
        for j in range(1,node[0]):
            state = (i,j)
            if environment[state] == 'empty':
                path_cost['steps'] += 1
                path_cost['energy_usage'] += 1
            elif environment[state] == 'wall':
                path_cost['steps'] += 3
                path_cost['energy_usage'] += 3
            elif environment[state] == 'hazard':
                path_cost['steps'] += 1
                path_cost['energy_usage'] += 3
            elif environment[state] == 'resource':
                path_cost['steps'] += 1
                path_cost['energy_usage'] += 2

        g = path_cost['energy_usage'] + path_cost['steps']
        return g
