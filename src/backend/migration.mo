import List "mo:core/List";
import Nat "mo:core/Nat";

module {
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

  type OldActor = {
    carBrands : [CarBrand];
    gameFeatures : [Text];
    releaseDate : Nat;
    partnerInfo : PartnerInfo;
  };

  type NewActor = {
    carBrands : [CarBrand];
    gameFeatures : [Text];
    releaseDate : Nat;
    partnerInfo : PartnerInfo;
    nextReviewId : Nat;
    reviews : List.List<Review>;
  };

  public func run(old : OldActor) : NewActor {
    {
      carBrands = old.carBrands;
      gameFeatures = old.gameFeatures;
      releaseDate = old.releaseDate;
      partnerInfo = old.partnerInfo;
      nextReviewId = 1;
      reviews = List.empty<Review>();
    };
  };
};
