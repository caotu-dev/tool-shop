import { actions } from "astro:actions";
import { Button } from "@/components/ui/button";

function DeleteProduct({ id }: Readonly<{ id: number }>) {
  const performDelete = async () => {
    const { data } = await actions.deleteProduct({ id });
    if (data) {
      window.location.reload();
    }
  };
  return (
    <Button onClick={performDelete} variant="destructive">
      Delete
    </Button>
  );
}

export { DeleteProduct };
