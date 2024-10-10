import { SVGProps } from "react";
import Dashboard from "../pages/dashboard/dashboard";
import Favorites from "../pages/favorites/favorites";
import DashboardIcon from "../components/icons/dashboard";
import FavoriteIcon from "../components/icons/favorite";
import RecipesIcon from "../components/icons/recipes";
import Grocery from "../pages/grocery/grocery";
import Settings from "../pages/settings/settings";
import GroceryIcon from "../components/icons/grocery";
import SettingsIcon from "../components/icons/settings";
import AllRecipes from "../pages/all-recipes/all-recipes";
import MyRecipes from "../pages/my-recipes/my-recipes";
import MyRecipeIcon from "../components/icons/my-recipe";
import Categories from "../pages/categories/categories";
import CategoriesIcon from "../components/icons/categories";

interface CustomRouteProps {
    path: string;
    component: React.ComponentType<any>;
    title?: string;
    Icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  }

  const routes: CustomRouteProps[] = [
    { path: "/dashboard", Icon: DashboardIcon, title: "Dashboard" , component: Dashboard },
    { path: "/all-recipes", Icon: RecipesIcon, title: "All Recipes", component: AllRecipes },
    { path: "/my-recipes", Icon: MyRecipeIcon, title: "My Recipes", component: MyRecipes },
    { path: "/categories", Icon: CategoriesIcon, title: "Categories", component: Categories },
    { path: "/favorites", Icon: FavoriteIcon, title: "Favorites", component: Favorites },
    { path: "/grocery", Icon: GroceryIcon, title: "Grocery List", component: Grocery },
    { path: "/settings", Icon: SettingsIcon, title: "Settings", component: Settings },

  ];
  
  export default routes;


