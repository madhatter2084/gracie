import imgDkModeBg1 from "figma:asset/bd29471e0ea4611e054140a8cbc50af76a82952e.png";

export default function Pic() {
  return (
    <div className="relative size-full" data-name="pic">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center justify-start p-[10px] relative size-full">
          <div className="bg-center bg-cover bg-no-repeat h-[800px] shrink-0 w-[533px]" data-name="dk-mode-bg 1" style={{ backgroundImage: `url('${imgDkModeBg1}')` }} />
        </div>
      </div>
    </div>
  );
}