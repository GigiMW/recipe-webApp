export interface ProfileUser {
  uid?: string;
  email?: string ;
  displayName?: string ;
  photoURL?: string;
  savedRecipes?: string[];
  following?: string[];
  followers?: string[];
}
