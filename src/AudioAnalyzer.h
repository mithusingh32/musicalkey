#ifndef AudioAnalyzer_H
#define AudioAnalyzer_H

#include <iostream>
#include <napi.h>
namespace AudioAnalyzer
{
    class AudioAnalyzer : public Napi::AsyncWorker
    {

    public:
        AudioAnalyzer(Napi::Function &callback);
        virtual ~AudioAnalyzer(){};

        void Execute();
        void OnOK();
        void OnError(const Napi::Error& e);

        private:
        std::string returnString; 
    };

} // namespace AudioAnalyzer

#endif