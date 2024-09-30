const usingDummyData = true;

import dummyData from "../data/dummy.json";

export async function getBoardgame()
{
    if (usingDummyData) {
        return dummyData.data.boardgames;
    }
    else {
        return null;
    }
}

export async function addBoardgame(name, category, image_url)
{
    await fetch("http://localhost:4000/boardgames", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            category: category,
            image_url: image_url,
        })
    });
}

export async function updateBoardgame(name, category, image_url)
{
    await fetch(`http://localhost:4000/boardgames/${categories.id}`,
    {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body:
            JSON.stringify({
                name: name,
                category: category,
                image_url: image_url,
            })
    });
}

export async function deleteBoardgame(boardgameId)
{
    await fetch (`http://localhost:4000/boardgames/${boardgameId}`,
    {
        method: 'DELETE',
    });
}