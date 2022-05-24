import { NextApiHandler } from "next";

var data = [[
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
      jobTitles: [
        { id: 1, name: 'Developer', isIncluded: true },
        { id: 2, name: 'Analyst', isIncluded: false },
    ],
  },
  {
    id: 2,
    name: 'Campaign 2',
    state: 'ARCHIVED',
    seniorites: [
        { id: 1, name: 'Director', isIncluded: true },
    ],
    keywords: [
        { id: 1, name: 'Technology', isIncluded: true },
    ],
    companysList: [
        { id: 1, name: 'Google', isIncluded: true },
    ],
    jobTitles: [
      { id: 2, name: 'Analyst', isIncluded: false },
  ],
},
]]


const user: NextApiHandler = (req, res) => {
  const { id } = req.query;
  debugger;
  const userData = typeof id === "string" ? data[Number(id)-1] : data[0];

  if (userData) {
    res.status(200).json(userData);
  } else {
    res.status(404).end();
  }
};

export default user;
