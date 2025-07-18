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
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { AppSelect } from "@/components/common/AppSelect";
import { actions } from "astro:actions";
import { Label } from "@/components/ui/label";
import { isValidUrl } from "@/lib/utils";

interface Props {
  product?: {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    imageUrl: string;
    stock: number;
    categoryId: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
  };
  categories: { title: string; value: any }[];
}
function ProductDialog(prop: Readonly<Props>) {
  const imageUrlSplitor = "___";
  const [name, setName] = useState(prop.product?.name ?? "");
  const [description, setDescription] = useState(
    prop.product?.description ?? ""
  );
  const [price, setPrice] = useState(prop.product?.price ?? 0);
  const [categoryId, setCategoryId] = useState(prop.product?.categoryId ?? 0);

  const [url, setUrl] = useState<string>("");
  const [imageList, setImageList] = useState<string[]>(
    prop.product?.imageUrl?.split(imageUrlSplitor) ?? []
  );

  const [status, setStatus] = useState("");
  const scope = prop.product?.id ? "Update" : "Create";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const product = {
      ...prop?.product,
      ...{
        name,
        description,
        price,
        categoryId,
        imageUrl: imageList.join(imageUrlSplitor),
      },
    };

    const { data } = prop.product?.id
      ? await actions.updateProduct({ ...product, id: prop.product?.id })
      : await actions.addProduct(product);

    if (data) {
      window.location.reload();
    } else {
      setStatus("Failed to save product.");
    }
  }

  const addImage = () => {
    if (!isValidUrl(url)) return;
    setImageList((images) => [...images, url]);
    setUrl("");
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">{scope}</Button>
        </DialogTrigger>
        <DialogContent style={{ minWidth: "80rem" }} className="w-full">
          <DialogHeader>
            <DialogTitle>{scope} product</DialogTitle>
          </DialogHeader>

          <div className="md:flex md:gap-6">
            <div className="w-1/3">
              <Label className="pb-2">Product name</Label>
              <Input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 rounded w-full"
                required
              />

              <Label className="pb-2 pt-2">Category name</Label>
              <AppSelect
                onValueChange={(val) => setCategoryId(+val)}
                defaultValue={categoryId}
                items={prop.categories}
                className={`w-full`}
              />

              <Label className="pb-2 pt-2">Price</Label>
              <Input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(+e.target.value)}
                className="border p-2 rounded w-full"
              />

              <div className="pt-2">
                <Label className="pb-2">Product image</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    type="text"
                    placeholder="Enter link"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="border p-2 rounded w-full"
                  />
                  <Button onClick={addImage}>Add image</Button>
                </div>

                <div className="flex gap-2 mt-2">
                  {imageList.map((image, index) => (
                    <img
                      className="w-1/3 border rounded"
                      key={image}
                      src={image}
                      alt={`image-${index}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="w-2/3">
              <Label className="pb-2">Description</Label>
              <Textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[550px] max-h-[800px]"
              />
            </div>
          </div>

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

export { ProductDialog };
