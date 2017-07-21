const validator = require("../src/validator");

describe("Validator", () => {
  describe("#getExpireLists()", () => {
    let testLists = [
      {
        host: "test1",
        expires: 30
      },
      {
        host: "test2",
        expires: 50
      },
      {
        host: "test3",
        expires: 100
      },
      {
        host: "test4",
        expires: 20
      }
    ];

    it("should sort a list by given exp date equal or lower than 30", () => {
      let { items } = validator.getExpireLists(testLists);
      expect(items.length).toEqual(2);
      expect(items[0].host).toEqual("test4");
      expect(items[1].host).toEqual("test1");
    });
  });

  describe("#getSortedLists()", () => {
    let testLists;

    beforeEach(() => {
      testLists = [
        {
          host: "test1",
          expires: 30
        },
        {
          host: "test2",
          expires: 50
        },
        {
          host: "test3",
          expires: 100
        },
        {
          host: "test4",
          expires: 20
        }
      ];
    });

    it("should not calculate data that is not an object", () => {
      testLists.push("Hello");
      let { items } = validator.getSortedLists(testLists);
      expect(items.length).toEqual(4);
    });

    it("should sort a list by exp date", () => {
      let { items } = validator.getSortedLists(testLists);
      expect(items.length).toEqual(4);
      expect(items[0].host).toEqual("test4");
      expect(items[1].host).toEqual("test1");
      expect(items[2].host).toEqual("test2");
      expect(items[3].host).toEqual("test3");
    });
  });

  describe("#expirationFormatter(host, validFrom, validTo)", () => {
    it("should format result", () => {
      let result = validator.expirationFormatter("test.com", "Jul 12 12:02:58 2017 GMT", "Oct  4 11:57:00 2017 GMT");
      expect(result).toEqual({
        host: "test.com",
        from: "Jul 12 12:02:58 2017 GMT",
        to: "Oct  4 11:57:00 2017 GMT",
        expires: 75
      });
    });
  });
});
