import heapq

def a_star_search(start, goal, environment, heuristic_func):
    open_set = []
    heapq.heappush(open_set, (0, start))  # f(n), node

    came_from = {}
    g_score = {start: 0}

    while open_set:
        _, current = heapq.heappop(open_set)

        if current == goal:
            return reconstruct_path(came_from, current)

        neighbors = get_neighbors(current, environment)

        for neighbor in neighbors:
            tentative_g = g_score[current] + calculate_cost(current, neighbor, environment)

            if neighbor not in g_score or tentative_g < g_score[neighbor]:
                came_from[neighbor] = current
                g_score[neighbor] = tentative_g
                f_score = tentative_g + heuristic_func(neighbor, goal)
                heapq.heappush(open_set, (f_score, neighbor))

    return None  # مسیری پیدا نشد

def reconstruct_path(came_from, current):
    path = [current]
    while current in came_from:
        current = came_from[current]
        path.append(current)
    path.reverse()
    return path

def get_neighbors(node, environment):
    x, y = node
    directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]  # بالا، پایین، چپ، راست
    neighbors = []
    for dx, dy in directions:
        neighbor = (x + dx, y + dy)
        if neighbor in environment:  # بررسی اینکه در محیط وجود داره
            neighbors.append(neighbor)
    return neighbors

def calculate_cost(current, neighbor, environment):
    tile_type = environment.get(neighbor, 'empty')
    if tile_type == 'empty':
        return 1
    elif tile_type == 'wall':
        return 3
    elif tile_type == 'hazard':
        return 3
    elif tile_type == 'resource':
        return 2
    return 1

def heuristic_func(node, goal):
    # فاصله منهتن؛ می‌تونی اینو با فاصله اقلیدسی یا مدل‌های دیگه جایگزین کنی
    return abs(node[0] - goal[0]) + abs(node[1] - goal[1])
