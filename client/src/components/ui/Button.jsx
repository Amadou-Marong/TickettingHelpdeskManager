const Button = ({ children, type }) => {
  return (
    <button
        type={type}
        className="flex cursor-pointer items-center justify-center gap-2 rounded-xl p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
      {children}
    </button>
  );
};

export default Button;
