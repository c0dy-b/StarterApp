namespace PracticeWebApp.Common
{
    public class Response<T>
    {
        public string Data { get; set; } = string.Empty;
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
