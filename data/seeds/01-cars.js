
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {
          "VIN": "1HGBH41JXMN109189",
          "make": "audi",
          "model": "A-3",
          "mileage": 90000
        },
        {
          "VIN": "1HGBH41JXMN109187",
          "make": "volvo",
          "model": "coupe",
          "mileage": 120000
        },
        {
          "VIN": "1HGBH41JXMN109181",
          "make": "toyota",
          "model": "TY",
          "mileage": 180000
        }
      ]);
    });
};
