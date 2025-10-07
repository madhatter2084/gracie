import imgUndercoverSingleCover1 from "figma:asset/7c4df68a4337d179507ba05e80902128911a809f.png";

export default function Pic2() {
  return (
    <div className="relative size-full" data-name="pic 2">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center justify-start p-[10px] relative size-full">
          <div className="bg-center bg-cover bg-no-repeat shrink-0 size-[800px]" data-name="Undercover Single Cover 1" style={{ backgroundImage: `url('${imgUndercoverSingleCover1}')` }} />
        </div>
      </div>
    </div>
  );
}