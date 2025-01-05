import { useSelector } from "react-redux";
import CardComponent from "../components/CardComponent";

function FavouritesPage() {
  const { allFavourites } = useSelector((state) => state.favouritesStore);
  return (
    <div className="container mx-auto mt-[50px] flex items-center gap-[50px]">
      {allFavourites.map((favouriteItem) => {
        return <CardComponent key={favouriteItem.id} product={favouriteItem} />;
      })}
    </div>
  );
}

export default FavouritesPage;
