const Button = ({ text = "submit" }: {text: string}) => {
    if (!text) {
        text = "submit"
    }
  return <button className="bg-blue-500">{text}</button>;
};

export default Button;
