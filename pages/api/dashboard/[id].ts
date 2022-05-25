import { NextApiHandler } from "next";

var data = [[
    {
        name: 'Example upload',
        errorCount: '24 errors',
        rowCount: '223 rows',
        file: `Column 1,Column 2,Column 3,Column 4
      1-1,1-2,1-3,1-4
      2-1,2-2,2-3,2-4
      3-1,3-2,3-3,3-4
      4,5,6,7`,
    },
]
]


const user: NextApiHandler = (req, res) => {
  const { id } = req.query;

  if (req.method === 'POST') {
    data[Number(id)-1].push(req.body)
    res.status(200).json(data[Number(id)-1])
    return
  }
  
  const userData = typeof id === "string" ? data[Number(id)-1] : data[0];

  if (userData) {
    res.status(200).json(userData);
  } else {
    res.status(404).end();
  }
};

export default user;
