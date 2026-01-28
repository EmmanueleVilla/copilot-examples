using System;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Text.Json;

class ApodFetcher
{
    static async Task<int> Main(string[] args)
    {
        string key = Environment.GetEnvironmentVariable("NASA_API_KEY") ?? (args.Length > 0 ? args[0] : "DEMO_KEY");
        Console.WriteLine(key == "DEMO_KEY" ? "Using DEMO_KEY — may be rate-limited." : "Using provided API key.");

        using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(8));
        using var http = new HttpClient();

        try
        {
            var url = $"https://api.nasa.gov/planetary/apod?api_key={Uri.EscapeDataString(key)}";
            using var res = await http.GetAsync(url, cts.Token);
            var content = await res.Content.ReadAsStringAsync(cts.Token);

            if (!res.IsSuccessStatusCode)
            {
                string details = string.Empty;
                try
                {
                    using var doc = JsonDocument.Parse(content);
                    if (doc.RootElement.TryGetProperty("msg", out var m)) details = m.GetString() ?? string.Empty;
                    else if (doc.RootElement.TryGetProperty("message", out var m2)) details = m2.GetString() ?? string.Empty;
                    else details = doc.RootElement.ToString();
                }
                catch
                {
                    details = content;
                }

                if ((int)res.StatusCode == 429)
                {
                    Console.Error.WriteLine("Rate limit exceeded. Try again later.");
                }
                else if ((int)res.StatusCode == 503)
                {
                    Console.Error.WriteLine("Service unavailable (API outage).");
                }
                else
                {
                    Console.Error.WriteLine($"{(int)res.StatusCode} {res.ReasonPhrase} - {details}");
                }

                return 2;
            }

            using var docRoot = JsonDocument.Parse(content);
            var root = docRoot.RootElement;
            if (root.ValueKind == JsonValueKind.Array && root.GetArrayLength() > 0)
            {
                root = root[0];
            }

            if (root.ValueKind != JsonValueKind.Object)
            {
                Console.Error.WriteLine("Unexpected API response");
                return 3;
            }

            var options = new JsonSerializerOptions { WriteIndented = true };
            string pretty = JsonSerializer.Serialize(root, options);
            Console.WriteLine(pretty);
            return 0;
        }
        catch (TaskCanceledException)
        {
            Console.Error.WriteLine("Request timed out after 8s.");
            return 3;
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine("Error: " + ex.Message);
            return 4;
        }
    }
}
