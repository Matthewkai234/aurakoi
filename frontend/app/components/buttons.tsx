
type ButtonProps = {
    variant: 'primary' | 'secondary' | 'danger';
    content?: string;
};

export default function Buttons({ variant, content }: ButtonProps) {
    if (variant === 'primary') {
        return (
<button className="bg-transparent 
               text-2xl font-bold font-aldrich 
               px-4 py-2 
               text-center 
               cursor-pointer 
               scale-100 hover:scale-110 transition-transform duration-300
               bg-clip-text text-white
               hover:drop-shadow-[0_0_15px_rgba(255,255,205,1)]">
               {content}
            </button>
            
        );
    }
}

