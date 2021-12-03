const chai = require("chai");
const ContentBasedRecommender = require("./contentBasedRecomender");

chai.should();

const documents = [
  {
    id: "1000001",
    content: "Why studying javascript is fun?",
  },
  {
    id: "1000002",
    content: "The trend for javascript in machine learning",
  },
  {
    id: "1000003",
    content: "The most insightful stories about JavaScript",
  },
  {
    id: "1000004",
    content: "Introduction to Machine Learning",
  },
  {
    id: "1000005",
    content: "Machine learning and its application",
  },
  {
    id: "1000006",
    content: "Python vs Javascript, which is better?",
  },
  {
    id: "1000007",
    content: "How Python saved my life?",
  },
  {
    id: "1000008",
    content: "The future of Bitcoin technology",
  },
  {
    id: "1000009",
    content: "Is it possible to use javascript for machine learning?",
  },
];
const targetDocuments = [
  {
    id: "1000010",
    content: "Why studying javascript is fun?",
  },
  {
    id: "1000011",
    content: "The trend for javascript in machine learning",
  },
  {
    id: "1000012",
    content: "The most insightful stories about JavaScript",
  },
  {
    id: "1000013",
    content: "Introduction to Machine Learning",
  },
  {
    id: "1000014",
    content: "Machine learning and its application",
  },
  {
    id: "1000015",
    content: "Python vs Javascript, which is better?",
  },
  {
    id: "1000016",
    content: "How Python saved my life?",
  },
  {
    id: "1000017",
    content: "The future of Bitcoin technology",
  },
  {
    id: "1000018",
    content: "Is it possible to use javascript for machine learning?",
  },
];

const contentBasedRecommender = async (documents) => {
  try {
    const recommender = new ContentBasedRecommender();
    recommender.train(documents);

    const similarDocuments = recommender.getSimilarDocuments(
      documents[documents.length - 1].id
    );
    return similarDocuments;
  } catch (err) {
    console.log("ERR contentBaseRecommender: ", err);
    return [];
  }
};

export default contentBasedRecommender;

// ===============================================
// Below is the document reference

// describe("ContentBasedRecommender", () => {
//   describe("options validation", () => {
//     it("should only accept maxVectorSize greater than 0", () => {
//       (() => {
//         const recommender = new ContentBasedRecommender({
//           maxVectorSize: -1,
//         });
//         recommender.train(documents);
//       }).should.to.throw(
//         "The option maxVectorSize should be integer and greater than 0"
//       );
//     });

//     it("should only accept maxSimilarDocuments greater than 0", () => {
//       (() => {
//         const recommender = new ContentBasedRecommender({
//           maxSimilarDocuments: -1,
//         });
//         recommender.train(documents);
//       }).should.to.throw(
//         "The option maxSimilarDocuments should be integer and greater than 0"
//       );
//     });

//     it("should only accept minScore between 0 and 1", () => {
//       (() => {
//         const recommender = new ContentBasedRecommender({
//           minScore: -1,
//         });
//         recommender.train(documents);
//       }).should.to.throw(
//         "The option minScore should be a number between 0 and 1"
//       );

//       (() => {
//         const recommender = new ContentBasedRecommender({
//           minScore: 2,
//         });
//         recommender.train(documents);
//       }).should.to.throw(
//         "The option minScore should be a number between 0 and 1"
//       );
//     });
//   });

//   describe("documents validation", () => {
//     const recommender = new ContentBasedRecommender();

//     it("should only accept array of documents", () => {
//       (() => {
//         recommender.train({
//           1000001: "Hello World",
//           1000002: "I love programming!",
//         });
//       }).should.to.throw("Documents should be an array of objects");
//     });

//     it("should only accept array of documents, with fields id and content", () => {
//       (() => {
//         recommender.train([
//           {
//             name: "1000001",
//             text: "Hello World",
//           },
//           {
//             name: "1000002",
//             text: "I love programming!",
//           },
//         ]);
//       }).should.to.throw("Documents should be have fields id and content");
//     });
//   });

//   describe("training result validation", () => {
//     it("should return list of similar documents in right order", () => {
//       const recommender = new ContentBasedRecommender();
//       recommender.train(documents);

//       const similarDocuments = recommender.getSimilarDocuments("1000002");

//       similarDocuments
//         .map((document) => document.id)
//         .should.to.have.ordered.members([
//           "1000004",
//           "1000009",
//           "1000005",
//           "1000003",
//           "1000006",
//           "1000001",
//         ]);
//     });

//     it("should to be able to control how many similar documents to obtain", () => {
//       const recommender = new ContentBasedRecommender();
//       recommender.train(documents);

//       let similarDocuments = recommender.getSimilarDocuments("1000002", 0, 2);
//       similarDocuments
//         .map((document) => document.id)
//         .should.to.have.ordered.members(["1000004", "1000009"]);

//       similarDocuments = recommender.getSimilarDocuments("1000002", 2);
//       similarDocuments
//         .map((document) => document.id)
//         .should.to.have.ordered.members([
//           "1000005",
//           "1000003",
//           "1000006",
//           "1000001",
//         ]);

//       similarDocuments = recommender.getSimilarDocuments("1000002", 1, 3);
//       similarDocuments
//         .map((document) => document.id)
//         .should.to.have.ordered.members(["1000009", "1000005", "1000003"]);
//     });

//     it("should to be able to control the minScore of similar documents", () => {
//       const recommender = new ContentBasedRecommender({ minScore: 0.4 });
//       recommender.train(documents);

//       documents.forEach((document) => {
//         const similarDocuments = recommender.getSimilarDocuments(document.id);
//         similarDocuments
//           .map((similarDocument) => similarDocument.score)
//           .forEach((score) => {
//             score.should.to.be.at.least(0.4);
//           });
//       });
//     });

//     it("should to be able to control the maximum number of similar documents", () => {
//       const recommender = new ContentBasedRecommender({
//         maxSimilarDocuments: 3,
//       });
//       recommender.train(documents);

//       documents.forEach((document) => {
//         const similarDocuments = recommender.getSimilarDocuments(document.id);
//         similarDocuments.should.to.have.lengthOf.at.most(3);
//       });
//     });
//   });

//   describe("training multi collection result validation", () => {
//     it("should return list of similar documents of the target collection in right order", () => {
//       const recommender = new ContentBasedRecommender();
//       recommender.trainBidirectional(documents, targetDocuments);

//       const similarDocuments = recommender.getSimilarDocuments("1000011");

//       similarDocuments
//         .map((document) => document.id)
//         .should.to.have.ordered.members([
//           "1000002",
//           "1000004",
//           "1000009",
//           "1000005",
//           "1000003",
//           "1000006",
//           "1000001",
//         ]);
//     });

//     it("should to be able to control how many similar documents to obtain using multiple collections", () => {
//       const recommender = new ContentBasedRecommender();
//       recommender.trainBidirectional(documents, targetDocuments);

//       let similarDocuments = recommender.getSimilarDocuments("1000011", 0, 2);
//       similarDocuments
//         .map((document) => document.id)
//         .should.to.have.ordered.members(["1000002", "1000004"]);

//       similarDocuments = recommender.getSimilarDocuments("1000011", 2);
//       similarDocuments
//         .map((document) => document.id)
//         .should.to.have.ordered.members([
//           "1000009",
//           "1000005",
//           "1000003",
//           "1000006",
//           "1000001",
//         ]);

//       similarDocuments = recommender.getSimilarDocuments("1000011", 1, 3);
//       similarDocuments
//         .map((document) => document.id)
//         .should.to.have.ordered.members(["1000004", "1000009", "1000005"]);
//     });

//     it("should to be able to control the minScore of similar documents", () => {
//       const recommender = new ContentBasedRecommender({ minScore: 0.4 });
//       recommender.train(documents);

//       documents.forEach((document) => {
//         const similarDocuments = recommender.getSimilarDocuments(document.id);
//         similarDocuments
//           .map((similarDocument) => similarDocument.score)
//           .forEach((score) => {
//             score.should.to.be.at.least(0.4);
//           });
//       });
//     });

//     it("should to be able to control the maximum number of similar documents", () => {
//       const recommender = new ContentBasedRecommender({
//         maxSimilarDocuments: 3,
//       });
//       recommender.train(documents);

//       documents.forEach((document) => {
//         const similarDocuments = recommender.getSimilarDocuments(document.id);
//         similarDocuments.should.to.have.lengthOf.at.most(3);
//       });
//     });
//   });

//   describe("export and import", () => {
//     it("should to be able to give the same results with recommender created by import method", () => {
//       const recommender = new ContentBasedRecommender({
//         maxSimilarDocuments: 3,
//         minScore: 0.4,
//       });
//       recommender.train(documents);

//       const s = recommender.export();

//       // create another recommender based on export result
//       const recommender2 = new ContentBasedRecommender(s);
//       recommender2.import(s);

//       documents.forEach((document) => {
//         const similarDocuments = recommender.getSimilarDocuments(document.id);
//         const similarDocuments2 = recommender2.getSimilarDocuments(document.id);

//         similarDocuments.should.to.deep.equal(similarDocuments2);
//       });
//     });
//   });
// });
