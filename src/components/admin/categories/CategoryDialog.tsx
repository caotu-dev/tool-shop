import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import { actions } from "astro:actions";

interface Props {
  id: number;
  name: string;
}
function CategoryDialog(prop: Readonly<Props>) {
  const [name, setName] = useState(prop?.name);
  const [status, setStatus] = useState("");
  const scope = prop?.id ? "Update" : "Create";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { data } = prop?.id
      ? await actions.updateCategory({ id: prop?.id, name })
      : await actions.addCategory({ name });

    if (data) {
      window.location.reload();
    } else {
      setStatus("Failed to save category.");
    }
  }

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">{scope}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{scope} category</DialogTitle>
          </DialogHeader>
          <Label>Category name</Label>
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
          <DialogFooter>
            <div>{status}</div>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={handleSubmit}
              type="submit"
              className="bg-black text-white px-4 py-2 rounded"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export { CategoryDialog };
