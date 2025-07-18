import { actions } from "astro:actions";
import { Button } from "@/components/ui/button";

function DeleteCategory({ id }: Readonly<{ id: number }>) {
  const performDelete = async () => {
    const { data } = await actions.deleteCategory({ id });
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

export { DeleteCategory };
