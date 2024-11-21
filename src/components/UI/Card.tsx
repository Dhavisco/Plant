import Logo from "../icons/Logo";

type CardProps = {
    title:string;
    children:React.ReactNode;
}

const Card: React.FC<CardProps> = (props) => {
  return (
    
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">

         <div className='flex justify-center'>
          <div className="mb-1">
            <Logo />
            <p className="font-semibold text-xl">Plant</p>
          </div>
        </div>
      <h2 className="text-xl font-bold mb-4 text-center">{props.title}</h2>
     
      <div>{props.children}</div>

      
    </div>
  )
}

export default Card