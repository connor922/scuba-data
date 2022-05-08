import { NextApiHandler } from "next";

var data =[
  {
      id: 1,
      name: 'Campaign 1',
      state: 'LIVE',
      seniorites: [
          { id: 1, name: 'Director', isIncluded: true },
          { id: 2, name: 'Manager', isIncluded: true },
          { id: 3, name: 'CEO', isIncluded: true },
          { id: 4, name: 'CFO', isIncluded: false },
          { id: 5, name: 'COO', isIncluded: false },
          { id: 6, name: 'Senior', isIncluded: false },
      ],
      keywords: [
          { id: 1, name: 'Technology', isIncluded: true },
          { id: 2, name: 'Logistics', isIncluded: true },
          { id: 3, name: 'Property', isIncluded: true },
          { id: 4, name: 'Management', isIncluded: false },
          { id: 5, name: 'Info Security', isIncluded: false },
      ],
      companysList: [
          { id: 1, name: 'Google', isIncluded: true },
          { id: 2, name: 'Amazon', isIncluded: true },
          { id: 3, name: 'Foxtons', isIncluded: true },
          { id: 4, name: 'Statpro', isIncluded: false },
          { id: 5, name: 'Conflience', isIncluded: false },
          { id: 6, name: 'Sainsburys', isIncluded: false },
      ],
  },
]


const user: NextApiHandler = (req, res) => {
  const { id } = req.query;
  const userData = data;

  if (userData) {
    res.status(200).json(userData);
  } else {
    res.status(404).end();
  }
};

export default user;
