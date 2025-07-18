import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  className?: string;
  placeholder?: string;
  selectLabel?: string;
  defaultValue?: any;
  items?: { title: string; value: any }[];
  onValueChange?(value: string): void;
  required?: boolean;
}

function AppSelect(props: Readonly<Props>) {
  return (
    <Select
      required={props?.required}
      defaultValue={props?.defaultValue}
      onValueChange={props?.onValueChange}
    >
      <SelectTrigger className={props?.className}>
        <SelectValue placeholder={props?.placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {props?.selectLabel && (
            <SelectLabel>{props?.selectLabel}</SelectLabel>
          )}
          {props?.items?.map((item) => {
            return (
              <SelectItem key={item.value} value={item.value}>
                {item.title}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export { AppSelect };
