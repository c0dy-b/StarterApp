namespace PracticeWebApp.Common
{
    public class Response<T>
    {
        public Response(T data)
        {
            Data = data;
        }

        public T? Data { get; set; }
        public List<Error> Errors { get; set; } = new();
        public bool HasErrors => Errors.Count > 0;

        public void AddError(string property, string message)
        {
            Errors.Add(new Error 
            { 
                Property = property, Message = message 
            });
        }
    }
}
