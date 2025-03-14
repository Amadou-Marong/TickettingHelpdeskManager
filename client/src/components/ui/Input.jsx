const Input = ({type}) => {
  return (
    <input
      type={type}
      className="flex h-10 w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 ring-offset-gray-300 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
    ></input>
  );
};

export default Input;
