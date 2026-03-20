import Array "mo:core/Array";
import Text "mo:core/Text";
import Time "mo:core/Time";
import List "mo:core/List";
import Migration "migration";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";

(with migration = Migration.run)
actor {
  type CarBrand = {
    name : Text;
    tagline : Text;
    description : Text;
    interiorFeatures : [Text];
  };

  type PartnerInfo = {
    name : Text;
    contactEmail : Text;
  };

  type Review = {
    id : Nat;
    author : Text;
    rating : Nat;
    text : Text;
    timestamp : Int;
  };

  let carBrands : [CarBrand] = [
    {
      name = "BMW";
      tagline = "The Ultimate Driving Machine";
      description = "BMW is known for its sporty and dynamic performance, delivering a balance of luxury and excitement.";
      interiorFeatures = [
        "Leather seats",
        "Ambient lighting",
        "Advanced infotainment system",
        "Driver assistance features",
      ];
    },
    {
      name = "Mercedes-Benz";
      tagline = "The Best or Nothing";
      description = "Mercedes-Benz offers luxury vehicles with cutting-edge technology, comfort, and elegance.";
      interiorFeatures = [
        "Massage seats",
        "Premium sound system",
        "Innovative safety features",
        "High-quality materials",
      ];
    },
    {
      name = "Lamborghini";
      tagline = "Expect the Unexpected";
      description = "Lamborghini is synonymous with Italian luxury and high-performance supercars.";
      interiorFeatures = [
        "Custom leather interiors",
        "Carbon fiber accents",
        "Advanced aerodynamics",
        "High-performance audio",
      ];
    },
    {
      name = "Ferrari";
      tagline = "The Art of Performance";
      description = "Ferrari exemplifies Italian excellence in sports cars, blending speed and style.";
      interiorFeatures = [
        "Handcrafted interiors",
        "Racing-inspired technology",
        "Luxury finishes",
        "Advanced navigation system",
      ];
    },
    {
      name = "Porsche";
      tagline = "There Is No Substitute";
      description = "Porsche combines performance, comfort, and timeless design in its luxury lineup.";
      interiorFeatures = [
        "High-quality leather",
        "Adaptive sports seats",
        "Cutting-edge tech",
        "Sound system",
      ];
    },
    {
      name = "Aston Martin";
      tagline = "Power, Beauty, and Soul";
      description = "Aston Martin offers British elegance and performance, producing iconic luxury cars.";
      interiorFeatures = [
        "Hand-stitched leather",
        "Wood accents",
        "Performance features",
        "High-end tech",
      ];
    },
    {
      name = "Bentley";
      tagline = "Luxury Beyond Compare";
      description = "Bentley combines British craftsmanship and advanced technology in luxury cars.";
      interiorFeatures = [
        "Custom interiors",
        "Plush leather",
        "Wood veneers",
        "Advanced comfort features",
      ];
    },
    {
      name = "Rolls-Royce";
      tagline = "Perfection, Reimagined";
      description = "Rolls-Royce sets the standard for luxury vehicles with astonishing attention to detail.";
      interiorFeatures = [
        "Handcrafted materials",
        "Opulent finishes",
        "Advanced technology",
        "Luxury comfort features",
      ];
    },
  ];

  let gameFeatures : [Text] = [
    "Car customization",
    "Racing challenges",
    "Virtual showroom",
    "Driving simulations",
    "Performance upgrades",
  ];

  let releaseDate = 1719792000000; // 2024-07-01 in nanoseconds

  let partnerInfo : PartnerInfo = {
    name = "AutoWorks";
    contactEmail = "info@autoworks.com";
  };

  var nextReviewId = 1;
  let reviews = List.empty<Review>();

  public query ({ caller }) func getAllCarBrands() : async [CarBrand] {
    carBrands;
  };

  public query ({ caller }) func getCarBrandByName(name : Text) : async ?CarBrand {
    carBrands.find(func(brand) { brand.name == name });
  };

  public query ({ caller }) func getGameFeatures() : async [Text] {
    gameFeatures;
  };

  public query ({ caller }) func getReleaseDate() : async Nat {
    releaseDate;
  };

  public query ({ caller }) func getPartnerInfo() : async PartnerInfo {
    partnerInfo;
  };

  public shared ({ caller }) func submitReview(author : Text, rating : Nat, text : Text) : async Nat {
    let review : Review = {
      id = nextReviewId;
      author;
      rating;
      text;
      timestamp = Time.now();
    };
    reviews.add(review);
    nextReviewId += 1;
    review.id;
  };

  public query ({ caller }) func getReviews() : async [Review] {
    reviews.reverseValues().toArray();
  };
};
