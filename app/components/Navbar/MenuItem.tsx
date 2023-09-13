'use client'
interface MenuItemProps{
    click: () => void;
    label: string;
}
const MenuItem: React.FC<MenuItemProps> = ({
    click, label
}) => {
  return (
    <div
        onClick={click}
        className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    >
        {label}
    </div>
  )
}

export default MenuItem