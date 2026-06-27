interface Props {
    title: string;
    description?: string;
  }
  
  export default function EmptyState({
    title,
    description,
  }: Props) {
    return (
      <div className="py-20 text-center">
  
        <h2 className="text-3xl font-bold">
  
          {title}
  
        </h2>
  
        {description && (
          <p className="mt-4 text-slate-500">
  
            {description}
  
          </p>
        )}
  
      </div>
    );
  }