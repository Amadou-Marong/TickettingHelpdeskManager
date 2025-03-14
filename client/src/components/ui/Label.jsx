const Label = ({htmlFor, children,...props}) => {
  return (
    <label htmlFor={htmlFor} {...props} className="text-gray-600 text-sm font-semibold">
        {children}
    </label>
  )
}

export default Label