var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () {
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */
      var notMushrooms = function(x) { return x != "mushrooms"};
      productsICanEat = _(products)
        .filter(function(x){ return !x.containsNuts && _(x.ingredients).all(notMushrooms); });

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {

    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    var sum = _.range(1,1000)
      .reduce(function(total,x){ if (x % 3 === 0 || x % 5 === 0){ total += x;}; return total; }, 0);  /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };



    /* chain() together map(), flatten() and reduce() */
    _(products).chain()
      .map(function(x) { return x.ingredients}).flatten().reduce(
        function(dummy,x) {
          ingredientCount[x] = (ingredientCount[x] || 0) + 1;
        }
      );

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  /* */
  it("should find the largest prime factor of a composite number", function () {
    // 73 x 89 = 6497
    var num = 6497;
    var primes = [2];
    var test = 2;
    var highestPrimeFactor = function(number) {
      var maxFactor = 1;
      while (test < number) {
        ++test;
        // Test if current number is divisible by any of the existing primes
        var prime = true;
        for(var i=0; i<primes.length; ++i) {
          if (test % primes[i] === 0) {
            // Not a prime
            prime = false;
            break;
          }
        }
        if (prime) {
          // Found a new prime
          primes.push(test);
          // Check if it is also a factor
          if (number % test === 0) {
            maxFactor = test;
          }
        }
      }
      return maxFactor;
    };
    expect(highestPrimeFactor(num)).toBe(89);
  });
  
  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    // Three digit numbers = 100 .. 999
    var largestPalindrome = 0;
    var isPalindrome = function(number) {
      // Convert to string
      var string = String(number);
      for (var i = 0; i <= string.length/2; ++i) {
        if (string[i] !== string[string.length -i - 1]) {
          return false;
        }
      }
      return true;
    };
    for (var n1 = 100; n1 <= 999; ++n1) {
      for (var n2 = 100; n2 <= 999; ++n2) {
        var product = n1 * n2;
        if (isPalindrome(product)) {
          if (product > largestPalindrome) {
            largestPalindrome = product;
          }
        }
      }
    }
    expect(largestPalindrome).toBe(906609);
  });
   
  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    var test = 19*20; // Must be divisible by 19 and 20
    var answer = undefined;
    while (answer === undefined) {
      for (var i=2; i<=20; ++i) {
        if (test % i !== 0) {
          // This isn't the answer
          break;
        }
        if (i === 20) {
          // Found it
          answer = test;
        }
      }
      test += 20; // Must be divisible by 20
    }
    expect(answer).toBe(232792560);

  });
  /*
  it("should find the difference between the sum of the squares and the square of the sums", function () {

  });
  */

  it("should find the 10001st prime", function () {
    var primes = [2];
    var test = 2;
    var n = 10001;
    while (primes.length < n) {
      ++test;
      // Test if current number is divisible by any of the existing primes
      var prime = true;
      for(var i=0; i<primes.length; ++i) {
        if (test % primes[i] === 0) {
          // Not a prime
          prime = false;
          break;
        }
      }
      if (prime) {
        // Found a new prime
        primes.push(test);
      }
    }
    expect(primes[n-1]).toBe(104743);
  });
  
});
